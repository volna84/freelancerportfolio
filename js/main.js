const btnDarkMode = document.querySelector(".dark-mode-btn");

// 1. Проверка активации темной темы на уровне системных настроек (т.е. активировал ли пользователь темную тему на уровне операционной системы: если активировал, то на сайте сразу включаем темную тему)
// Проверяем: 1) есть ли возможность в данном браузере выполнять медиа-запросы в js; 2) если выполняется медиа-запрос на включение темной темы и возвращает true
// Если все выполняется, добавляем темную тему (яндекс браузер не поддерживает данные настройки)
if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
) {
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
}

// 2. Проверка в LocalStorage активации темной темы при загрузке страницы
if (localStorage.getItem("darkMode") === "dark") {
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
} else if (localStorage.getItem("darkMode") === "light") {
    btnDarkMode.classList.remove("dark-mode-btn--active");
    document.body.classList.remove("dark");
}


// Если меняются системные настройки (в зависимости от времени суток), меняем тему (слушаем событие change)
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
        const newColorScheme = event.matches ? "dark" : "light";

        if (newColorScheme === "dark") {
			btnDarkMode.classList.add("dark-mode-btn--active");
			document.body.classList.add("dark");
			localStorage.setItem("darkMode", "dark");
		} else {
			btnDarkMode.classList.remove("dark-mode-btn--active");
			document.body.classList.remove("dark");
			localStorage.setItem("darkMode", "light");
		}
    });

// Активация ночной темы по клику
btnDarkMode.addEventListener("click", function () {
    this.classList.toggle("dark-mode-btn--active");

    const isDark = document.body.classList.toggle("dark");

    if (isDark) {
        localStorage.setItem("darkMode", "dark");
    } else {
        localStorage.setItem("darkMode", "light");
    }
});
