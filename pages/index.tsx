import dynamic from "next/dynamic"

const Home = dynamic(() => import("../packages/webapp/components/Home"), { ssr: false })

export default function Homepage() {
  return (
    <Home />
  )
}
