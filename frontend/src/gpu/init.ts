const fadeShader = `
struct VSOut {
  @builtin(position) position: vec4<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) index: u32) -> VSOut {
    var pos = array<vec2<f32>, 3>(
        vec2<f32>(-1.0, -1.0),
        vec2<f32>( 3.0, -1.0),
        vec2<f32>(-1.0,  3.0)
    );

    var out: VSOut;
    out.position = vec4<f32>(pos[index], 0.0, 1.0);
    return out;
}

@fragment
fn fs_main() -> @location(0) vec4<f32> {
  // Very small alpha = slow fade
  return vec4<f32>(0.0, 0.0, 0.0, 0.03);
}

`
const computeCode =
  `
  struct Params {
    time: f32,        // 4
    dt: f32,          // 4
    count: u32,       // 4
    _pad: u32,        // 4   → 16 bytes

    mouse: vec2<f32>, // 8
    _pad2: vec2<f32>, // 8   → 16 bytes
};


@group(0) @binding(0)
var<storage, read_write> particles: array<vec2<f32>>;

@group(0) @binding(1)
var<uniform> params: Params;

fn hash(n: u32) -> f32 {
    var x = (n << 13u) ^ n;
    let res = 1.0 - f32((x * (x * x * 15731u + 789221u) + 1376312589u)
        & 0x7fffffffu) / 1073741824.0;
    return res;
}

fn random2(id: u32, time: f32) -> vec2<f32> {
    let t = u32(time * 4096.0);
    let x = hash(id ^ t);
    let y = hash((id + 17u) ^ (t * 31u));
    return vec2<f32>(x, y);
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

fn perlin(p: vec2<f32>) -> f32 {
    // Grid cell coordinates
    let i = floor(p);
    let f = fract(p);

    // Gradient vectors at the 4 corners
    let g00 = randomGradient(i + vec2<f32>(0.0, 0.0));
    let g10 = randomGradient(i + vec2<f32>(1.0, 0.0));
    let g01 = randomGradient(i + vec2<f32>(0.0, 1.0));
    let g11 = randomGradient(i + vec2<f32>(1.0, 1.0));

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

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let id = gid.x;

    if (id >= params.count) {
        return;
    }

    var p = particles[id];

    let scale = 3.0;
    let offset = vec2<f32>(params.time * 0.2, params.time * 0.173);
    let sp = p * scale  + offset;
    let n = perlin(sp);
    let angle = n * 6.283185;

    var dir = vec2<f32>(cos(angle), sin(angle));
    p += dir * params.dt * 0.09;
    
    if (p.x > 1.0 || p.x < -1.0 || p.y > 1.0 || p.y < -1.0) {
        p = random2(id, params.time);
    }

    particles[id] = p;
}
`
const shaderCode = `
@group(0) @binding(0)
var<storage, read> particles : array<vec2<f32>>;

struct VSOut {
    @builtin(position) pos : vec4<f32>,
    @location(0) uv: vec2<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) cornerIndex : u32, @builtin(instance_index) particleIndex : u32) -> VSOut {
    let center = particles[particleIndex];
    var offset = vec2<f32>(0.0);
    
    switch(cornerIndex) {
      case 0u: { offset = vec2<f32>(-1.0, -1.0); }
      case 1u: { offset = vec2<f32>( 1.0, -1.0); }
      case 2u: { offset = vec2<f32>(-1.0,  1.0); }

      case 3u: { offset = vec2<f32>(-1.0,  1.0); }
      case 4u: { offset = vec2<f32>( 1.0, -1.0); }
      case 5u: { offset = vec2<f32>( 1.0,  1.0); }

      default: {}
    }
    let size = 0.002;
    

    var out: VSOut;
    out.pos = vec4<f32>(center + offset * size, 0.0, 1.0);
    out.uv = offset * 0.5 + vec2<f32>(0.5);

    return out;
}


@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {

  // Make circular particle
  let dist = distance(in.uv, vec2<f32>(0.5));
  if (dist > 0.5) {
    discard;
  }

  // let t = 0.5 + 0.5 * sin(param.time);
  // let colorA = vec3<f32>(0.75, 0.38, 1.0);
  // let colorB = vec3<f32>(0.0, 0.0, 0.0);
  // let color = mix(colorB, colorA, t);
  return vec4<f32>(1.0, 1.0, 1.0, 1.0);
}
`;

const historySamplerShader = `
@group(0) @binding(0)
var historyTex: texture_2d<f32>;

@group(0) @binding(1)
var historySampler: sampler;

struct VSOut {
    @builtin(position) pos: vec4<f32>,
    @location(0) uv: vec2<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) i: u32) -> VSOut {
    var pos = array<vec2<f32>, 3>(
        vec2(-1.0, -1.0),
        vec2( 3.0, -1.0),
        vec2(-1.0,  3.0)
    );

    var out: VSOut;
    out.pos = vec4(pos[i], 0.0, 1.0);
    out.uv = (pos[i] + 1.0) * 0.5;
    return out;
}

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
    return textureSample(historyTex, historySampler, in.uv);
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

  const PARTICLE_COUNT = 50_000;

  const particleData = new Float32Array(PARTICLE_COUNT * 2);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const base = i * 2;
    // Random positions in clip space (-1 to 1)
    particleData[base + 0] = Math.random() * 2 - 1; // x
    particleData[base + 1] = Math.random() * 2 - 1; // y
  }

  const particleBuffer = device.createBuffer({  // equivalent to SSBO
    size: particleData.byteLength,
    usage:
      GPUBufferUsage.STORAGE |
      GPUBufferUsage.VERTEX |
      GPUBufferUsage.COPY_DST,
  });

  // buffer for uniforms
  const uniformBufferSize = 32; // 4 floats aligned

  const uniformBuffer = device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });


  device.queue.writeBuffer(particleBuffer, 0, particleData);

  const historyTexture = device.createTexture({
    size: [canvas.width, canvas.height],
    format,
    usage:
      GPUTextureUsage.RENDER_ATTACHMENT |
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_SRC,
  });

  const sampler = device.createSampler({
    magFilter: "linear",
    minFilter: "linear",
  });



  const computeModule = device.createShaderModule({
    code: computeCode,
  });

  const computePipeline = device.createComputePipeline({
    layout: "auto",
    compute: {
      module: computeModule,
      entryPoint: "main",
    },
  });

  const fadeModule = device.createShaderModule({
    code: fadeShader
  });

  const fadePipeline = device.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: fadeModule,
      entryPoint: "vs_main",
    },

    fragment: {
      module: fadeModule,
      entryPoint: "fs_main",
      targets: [{
        format,
        blend: {
          color: {
            srcFactor: "src-alpha",
            dstFactor: "one-minus-src-alpha",
            operation: "add",
          },
          alpha: {
            srcFactor: "one",
            dstFactor: "one-minus-src-alpha",
            operation: "add",
          },
        }
      }],
    },
    primitive: {
      topology: "triangle-list",
    },
  });



  const shaderModule = device.createShaderModule({
    code: shaderCode,
  });

  const bindGroup = device.createBindGroup({
    layout: computePipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: { buffer: particleBuffer },
      },
      {
        binding: 1,
        resource: { buffer: uniformBuffer },
      },
    ],
  });


  const renderPipeline = device.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: shaderModule,
      entryPoint: "vs_main",
    },
    fragment: {
      module: shaderModule,
      entryPoint: "fs_main",
      targets: [{
        format,
        blend: {
          color: {
            srcFactor: "one",
            dstFactor: "one",
            operation: "add",
          },
          alpha: {
            srcFactor: "one",
            dstFactor: "one",
            operation: "add",
          },
        },
      }],

    },
    primitive: {
      topology: "triangle-list",  // = GL_POINTS
    },
  });

  const presentModule = device.createShaderModule({
    code: historySamplerShader
  })

  const presentPipeline = device.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: presentModule,
      entryPoint: "vs_main",
    },
    fragment: {
      module: presentModule,
      entryPoint: "fs_main",
      targets: [{ format }],
    },
    primitive: {
      topology: "triangle-list",
    },
  });

  const renderBindGroup = device.createBindGroup({
    layout: renderPipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: { buffer: particleBuffer },
      },
    ],
  });


  const presentBindGroup = device.createBindGroup({
    layout: presentPipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: historyTexture.createView(),
      },
      {
        binding: 1,
        resource: sampler,
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
    device.queue.writeBuffer(
      uniformBuffer,
      0,
      new Float32Array([
        time,            // f32
        dt,              // f32
        PARTICLE_COUNT,  // u32 (fine as float)
        0,               // pad

        mouse.x,         // vec2
        mouse.y,
        0,               // pad2.x
        0                // pad2.y
      ])

    );

    // --- COMPUTE ---

    const computePass = encoder.beginComputePass();
    computePass.setPipeline(computePipeline);
    computePass.setBindGroup(0, bindGroup);

    computePass.dispatchWorkgroups(
      Math.ceil(PARTICLE_COUNT / 256)
    );

    computePass.end();


    // render particle trails and fade into historyTexture
    const renderPass = encoder.beginRenderPass({
      colorAttachments: [{
        view: historyTexture.createView(),
        loadOp: "load",
        storeOp: "store",
      }],
    });

    // --- FADE ---
    renderPass.setPipeline(fadePipeline);
    renderPass.draw(3);

    // --- DRAW ---
    renderPass.setPipeline(renderPipeline);
    renderPass.setBindGroup(0, renderBindGroup);
    renderPass.draw(6, PARTICLE_COUNT);
    renderPass.end();

    // sample history texture into fullscreen triangle
    const presentPass = encoder.beginRenderPass({
      colorAttachments: [{
        view: context.getCurrentTexture().createView(),
        loadOp: "clear",
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
        storeOp: "store",
      }],
    });
    presentPass.setPipeline(presentPipeline);
    presentPass.setBindGroup(0, presentBindGroup);
    presentPass.draw(3);
    presentPass.end();

    device.queue.submit([encoder.finish()]);

    animationId = requestAnimationFrame(frame);
  }

  frame();

  return () => {
    cancelAnimationFrame(animationId);
  };
}
