import Header from "./Header";

export default function Page({ children }) {
	return <div>
		<Header></Header>
		<h2>I'm the page component</h2>
		{children}
	</div>
}
