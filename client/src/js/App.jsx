import "../css/App.css";
import BlogEntry from "./BlogEntry";
import Header from "./Header";

const App = () => {
	return (
		<div className="app">
			<Header />
			<main className="app-content">
				<BlogEntry />
				<BlogEntry />
				<BlogEntry />
				<BlogEntry />
			</main>
		</div>
	);
};

export default App;
