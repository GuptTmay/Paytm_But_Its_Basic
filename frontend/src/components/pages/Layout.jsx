import { Link } from "react-router-dom";

export const Layout = () => {
	return (
		<>
			<nav>
				<ul>
          <li>
            <Link to="/">Home</Link>
          </li>
					<li>
						<Link to="/signup">Signup</Link>
					</li>
					<li>
						<Link to="/signin">Signin</Link>
					</li>
					<li>
						<Link to="/dashboard">DashBoard</Link>
					</li>
					<li>
						<Link to="/send">Send</Link>
					</li>
				</ul>
			</nav>
		</>
	)
}
