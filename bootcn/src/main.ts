import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/theme/theme.scss";

declare global {
	interface Window {
		lucide?: {
			createIcons: () => void;
		};
	}
}

if (window.lucide) {
	window.lucide.createIcons();
}

export {};
