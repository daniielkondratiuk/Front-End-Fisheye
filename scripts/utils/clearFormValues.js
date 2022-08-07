function clearFormValues(form) {
    const inputs = form.querySelectorAll('input')
    const textAreas = form.querySelectorAll('textarea')
    inputs.forEach(input => input.value = '')
    textAreas.forEach(textarea => textarea.value = '')
}

export default clearFormValues