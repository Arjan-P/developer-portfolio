export default function FooterBar() {
  return (
    <div className="flex items-center justify-center gap-6 h-20 px-4">
      
      <a
        href="https://github.com/Arjan-P"
        target="_blank"
        rel="noopener noreferrer"
        className="h-[60%] aspect-square text-gray-asparagus-900 hover:text-gray-asparagus-400 transition-colors"
        aria-label="GitHub"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-full w-full fill-current"
          aria-hidden="true"
        >
          <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.54-3.87-1.54-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.19a11 11 0 0 1 5.79 0c2.2-1.5 3.18-1.19 3.18-1.19.63 1.59.23 2.76.11 3.05.74.81 1.19 1.85 1.19 3.11 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.07.78 2.16v3.2c0 .3.21.65.79.54A11.52 11.52 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z" />
        </svg>
      </a>
    </div>
  )
}
