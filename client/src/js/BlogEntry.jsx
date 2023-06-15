import "../css/BlogEntry.css";

const BlogEntry = () => {
	return (
		<div className="main">
			<div className="left">
				<img
					src="https://techcrunch.com/wp-content/uploads/2023/06/GettyImages-1429997322.jpg?w=430&h=230&crop=1"
					alt=""
				/>
			</div>
			<div className="right">
				<h1>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
					corporis!
				</h1>
				<div className="info">
					<span>Walter White</span>
					<span>12-11-2043 11.00am</span>
				</div>
				<div>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
					animi delectus molestiae repudiandae ut ab eligendi perspiciatis qui.
					Ab tempore officia fugit cum natus explicabo amet minus! Nam,
					aspernatur fugit.
				</div>
			</div>
		</div>
	);
};

export default BlogEntry;
