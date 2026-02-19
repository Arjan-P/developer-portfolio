const fullscreenTriangleShader = `
struct Params {
  time  : f32,
  dt    : f32,
  mouse : vec2<f32>,   // total = 16 bytes
};

@group(0) @binding(0)
var<uniform> params : Params;

struct VSOut {
  @builtin(position) position : vec4<f32>,
  @location(0) uv : vec2<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) vertexIndex : u32) -> VSOut {
  var pos = array<vec2<f32>, 3>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 3.0, -1.0),
    vec2<f32>(-1.0,  3.0)
  );

  var output : VSOut;
  output.position = vec4<f32>(pos[vertexIndex], 0.0, 1.0);
  output.uv = pos[vertexIndex] * 0.5 + 0.5;
  return output;
}

fn randomGradient(p: vec2<f32>) -> vec2<f32> {
    let q = vec2<f32>(
        dot(p, vec2<f32>(127.1, 311.7)),
        dot(p, vec2<f32>(269.5, 183.3))
    );

    let g = -1.0 + 2.0 * fract(sin(q) * 43758.5453123);
    return normalize(g);
}

fn fade(t: vec2<f32>) -> vec2<f32> {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

fn rotate(v: vec2<f32>, a: f32) -> vec2<f32> {
  let s = sin(a);
  let c = cos(a);
  return vec2<f32>(c * v.x - s * v.y, s * v.x + c * v.y);
}

fn perlin(p: vec2<f32>) -> f32 {
    // Grid cell coordinates
    let i = floor(p);
    let f = fract(p);
    let angle = params.time * 0.4;

    // Gradient vectors at the 4 corners
    let g00 = rotate(randomGradient(i + vec2<f32>(0.0, 0.0)), angle);
    let g10 = rotate(randomGradient(i + vec2<f32>(1.0, 0.0)), angle);
    let g01 = rotate(randomGradient(i + vec2<f32>(0.0, 1.0)), angle);
    let g11 = rotate(randomGradient(i + vec2<f32>(1.0, 1.0)), angle);

    // Distance vectors from each corner
    let d00 = f - vec2<f32>(0.0, 0.0);
    let d10 = f - vec2<f32>(1.0, 0.0);
    let d01 = f - vec2<f32>(0.0, 1.0);
    let d11 = f - vec2<f32>(1.0, 1.0);

    // Dot products
    let n00 = dot(g00, d00);
    let n10 = dot(g10, d10);
    let n01 = dot(g01, d01);
    let n11 = dot(g11, d11);

    // Interpolation weights
    let u = fade(f);

    // Bilinear interpolation
    let nx0 = mix(n00, n10, u.x);
    let nx1 = mix(n01, n11, u.x);
    let nxy = mix(nx0, nx1, u.y);

    return nxy;
}

@fragment
fn fs_main(@location(0) uv : vec2<f32>) -> @location(0) vec4<f32> {
  let scale = 8.0;
  let mouseUV = params.mouse * 0.5 + 0.5;
  let diff = uv - mouseUV;
  let dist = length(diff);

  // radius of influence
  let radius = 0.15;

  // smooth radial mask
  let falloff = pow(1.0 - smoothstep(0.0, radius, dist), 2.0);

  let noiseWarp = vec2<f32>(
    perlin(uv * 4.0 + params.time * 0.4),
    perlin(uv * 4.0 + 100.0 + params.time * 0.4)
  );

  let warpedUV = uv + noiseWarp * falloff * 0.1;

  var n = 1.0 - abs(perlin(warpedUV * scale));

  n = n * 0.5 + 0.5;
  let background = vec3<f32>(233, 228, 216) / 255.0;
  let foreground = vec3<f32>(30,30,30) / 255.0;
  let shaped = pow(n, 1.4);
  let color = mix(foreground, background, shaped);


  //let color = mix(light, dark, n);

  return vec4<f32>(color, 1.0);
}
`

export async function initWebGPU(canvas: HTMLCanvasElement) {
  if (!navigator.gpu) {
    console.error("WebGPU not supported");
    return;
  }

  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter!.requestDevice();

  const context = canvas.getContext("webgpu") as GPUCanvasContext;

  const format = navigator.gpu.getPreferredCanvasFormat();

  context.configure({
    device,
    format,
    alphaMode: "opaque",
  });

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let mouse = {
    x: 0,
    y: 0
  }
  let mouseLag = { x: 0, y: 0 };

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = x / canvas.width;
    const ny = y / canvas.height;
    const ndcX = nx * 2 - 1;
    const ndcY = ny * -2 + 1;
    mouse.x = ndcX;
    mouse.y = ndcY;
    console.log(ndcX, ndcY);
  });

  const uniformBufferSize = 16; // 16 bytes

  const uniformBuffer = device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const shaderModule = device.createShaderModule({
    code: fullscreenTriangleShader,
  });

  const pipeline = device.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: shaderModule,
      entryPoint: "vs_main",
    },
    fragment: {
      module: shaderModule,
      entryPoint: "fs_main",
      targets: [
        {
          format,
        },
      ],
    },
    primitive: {
      topology: "triangle-list",
    },
  });

  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: {
          buffer: uniformBuffer,
        },
      },
    ],
  });

  let animationId: number;
  let lastTime = performance.now();
  //let firstFrame = true;

  function frame() {
    const encoder = device.createCommandEncoder();
    const now = performance.now();
    const dtRaw = (now - lastTime) / 1000;
    const dt = Math.min(dtRaw, 0.016);
    lastTime = now;
    const time = now / 1000;
    const smoothing = 8.0; // higher = faster catchup

    mouseLag.x += (mouse.x - mouseLag.x) * Math.min(1, dt * smoothing);
    mouseLag.y += (mouse.y - mouseLag.y) * Math.min(1, dt * smoothing);

    const uniformData = new Float32Array([
      time,
      dt,
      mouseLag.x,
      mouseLag.y
    ]);

    device.queue.writeBuffer(
      uniformBuffer,
      0,
      uniformData.buffer
    );

    const textureView = context.getCurrentTexture().createView();

    const renderPass = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: textureView,
          loadOp: "clear",
          storeOp: "store",
          clearValue: { r: 0, g: 0, b: 0, a: 1 },
        },
      ],
    });

    renderPass.setPipeline(pipeline);
    renderPass.setBindGroup(0, bindGroup);
    renderPass.draw(3);

    renderPass.end();

    device.queue.submit([encoder.finish()]);

    animationId = requestAnimationFrame(frame);
  }

  frame();

  return () => {
    cancelAnimationFrame(animationId);
  };
}
