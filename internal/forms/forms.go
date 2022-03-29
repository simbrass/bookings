package forms

import (
	"net/url"
	"strings"

	"github.com/asaskevich/govalidator"
)

//Form creates a custom form struct, and embeds a url.Values object
type Form struct {
	url.Values
	Errors errors
}

//Valid returns true if there are no errors otherwise false
func (f *Form) Valid() bool {
	return len(f.Errors) == 0
}

//New initializes a new form struct
func New(data url.Values) *Form {
	return &Form{
		data,
		errors(map[string][]string{}),
	}
}

//Required parse through the fields to check if one or more is blank
func (f *Form) Required(fields ...string) {
	for _, field := range fields {
		value := f.Get(field)
		if strings.TrimSpace(value) == "" {
			f.Errors.Add(field, "This field cannot be blank!")
		}
	}
}

//MinLen checks for minimum character length
func (f *Form) MinLen(length int, fields ...string) {
	for _, field := range fields {
		value := f.Get(field)
		if len(value) < length {
			f.Errors.Add(field, "This field must be at least 1 character long.")
		}
	}
}

//Has checks if field is in post and not empty
// func (f *Form) Has(field string, r http.Request) bool {
// 	x := r.Form.Get(field)
// 	if x == "" {
// 		f.Errors.Add(field, "This field cannot be blank.")
// 		return false
// 	}
// 	return true
// }

//MinLen checks for string minimum length
// func (f *Form) MinLen(field string, length int, r *http.Request) bool {
// 	x := r.Form.Get(field)
// 	if len(x) < length {
// 		f.Errors.Add(field, "Enter a real name.")
// 		return false
// 	}
// 	return true
// }

//IsEmail checks for valid email address
func (f *Form) IsEmail(field string) {
	if !govalidator.IsEmail(f.Get(field)) {
		f.Errors.Add(field, "Please, enter a valid email.")
	}
}
