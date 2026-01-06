# Client-side Technologies — Assignment 10

## JavaScript Fundamentals

### A. BOM

#### A.1 Cookies

Create a `cookieLib.js` file that provides the following functions (implementations not included in this document):

-   `getCookie(cookieName)`
    -   Retrieves a cookie value based on a cookie name.
-   `setCookie(cookieName, cookieValue[, expiryDate])`
    -   Sets a cookie based on a cookie name, cookie value, and optional expiration date.
-   `deleteCookie(cookieName)`
    -   Deletes a cookie based on a cookie name.
-   `allCookieList()`
    -   Returns a list of all stored cookies.
-   `hasCookie(cookieName)`
    -   Checks whether a cookie exists or not.

Use these functions to:

-   Create the required cookies for a visitor (username, favColor, visitCount, gender, etc.).
-   Display a greeting message to the visitor and show a profile image depending on their gender.
-   Inform the visitor of their number of visits to the site and render the username and visit count using the visitor's chosen color.

Notes:

-   Do not use a `<form>` tag in the registration page.
-   Replace the registration page with the profile page using the `location` object.
-   Validate function calls and throw appropriate errors for wrong usage (e.g., missing parameters or incorrect parameter types).

### B. Built-in Objects

#### B.1 Error Object

1. Create a function that accepts only two parameters and throws an exception if the number of parameters is less than or greater than two.
2. Create an adding function that sums `n` numbers. Throw an exception if any argument is not a number or if the function is called with no parameters.
