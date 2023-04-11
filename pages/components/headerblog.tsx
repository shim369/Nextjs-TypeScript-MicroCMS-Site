import Link from 'next/link'
import { useEffect, useRef } from "react"

export default function Header() {
	const headerInner = useRef<HTMLElement | null>(null);
	const nav = useRef<HTMLElement | null>(null);
	const spNav = useRef<HTMLElement | null>(null);
	const body = useRef<HTMLElement | null>(null);
	const menuBtn = useRef<HTMLElement | null>(null);
  
	useEffect(() => {
	  headerInner.current = document.querySelector(".header-inner");
	  window.addEventListener("scroll", () => {
		if (headerInner.current) {
		  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
			headerInner.current.classList.add("active");
		  } else {
			headerInner.current.classList.remove("active");
		  }
		}
	  });
  
	  nav.current = document.querySelector(".header-lists");
	  spNav.current = document.querySelector(".sp-nav");
  
	  if (nav.current && spNav.current) {
		spNav.current.appendChild(nav.current.cloneNode(true));
	  }
  
	  body.current = document.querySelector("body");
	  menuBtn.current = document.querySelector(".sp-nav-btn");
  
	  if (menuBtn.current) {
		menuBtn.current.addEventListener("click", () => {
		  if (body.current) {
			body.current.classList.toggle("side-open");
		  }
		});
	  }

	 return () => {
		window.removeEventListener("scroll", () => {});
		if (menuBtn.current) {
		  menuBtn.current.removeEventListener("click", () => {});
		}
	  };
	}, []);
	return (
		<>
		<header className="header-blog">
			<div className="header-inner">
				<div className="logo"><Link href="/">NEXT<br />BASE</Link></div>
				<nav className="pc-nav">
					<ul className="header-lists">
						<li><Link href="/#a01">About</Link></li>
						<li><Link href="/#a02">Skills</Link></li>
						<li><Link href="/#a03">Blog</Link></li>
						<li><Link href="/#a04">Contact</Link></li>
					</ul>
				</nav>
				<div className="sp-nav-area">
					<div className="sp-nav-btn">
						<span className="material-icons menu-icon">menu</span>
						<span className="material-icons close-icon">close</span>
					</div>
					<nav className="sp-nav">
					</nav>
				</div>
			</div>
		</header>
		</>
	)
}
