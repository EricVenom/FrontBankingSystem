export function setCookie(name, value, days) {
    let expires = "";
    if (value) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = `${name}=${(value || "")}; ${expires}; path=/; Secure; SameSite=Strict;`
}

export function getCookie(name) {
    const cookie = document.cookie.split(';').filter(cookie => {
        return cookie.trim().startsWith(name + '=');
    });

    if (cookie) {
        return cookie[0].split("=")[1];
    }
}

export function deleteCookie(name, path = "/", domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}