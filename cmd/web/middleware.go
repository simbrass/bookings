package main

import (
	"net/http"

	"github.com/justinas/nosurf"
)

//NoSurf adds CSRF adds protection to POST requests
func NoSurf(next http.Handler) http.Handler {
	csrfHandler := nosurf.New(next)
	csrfHandler.SetBaseCookie(http.Cookie{
		HttpOnly: true,
		Path:     "/",
		Secure:   app.InProduction,
		SameSite: http.SameSiteLaxMode,
	})
	return csrfHandler
}

//SessionLoad loads and saves the session on every requests
func SessionLoad(next http.Handler) http.Handler {
	return session.LoadAndSave(next)
}
