export default () => {

    // //tabs and tabcontent
	const list = document.querySelector(".artist-tabs__list");
	const tabs = document.querySelectorAll(".artist-tabs__item");

	if(list !== null) {
		list.addEventListener("click", (e) => {
			let target = e.target.closest(".artist-tabs__item");
				for (let tab of tabs) {
					if(tab.classList.contains("active")) {
						tab.classList.remove("active");
					} 
				}
				target.classList.add("active");
		});
	}
}