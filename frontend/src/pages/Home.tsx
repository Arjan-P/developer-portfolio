import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    document.title = "Home";
  }, [])
  return (

    <section className="py-8">
      <h1>Home</h1>
    </section>
  )
}

