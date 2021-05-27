document.addEventListener('DOMContentLoaded', () => {

    const errorBtn = document.getElementById('error-btn')

    errorBtn.addEventListener('click', () => {

        const divError = document.getElementsByClassName('error')[0]

        divError.style.height = '0'
        divError.style.padding = '0'
        divError.style.marginBottom = '0'

    })

})
