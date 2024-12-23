const form = document.getElementById('ticketForm')

const dropArea = document.getElementById('dropArea')
const fileInput = document.getElementById('fileInput')
const uploadedImage = document.getElementById('uploadedImage')
const messageAction = document.getElementById('messageAction')
const fileActions = document.getElementById('fileActions')
const removeImage = document.getElementById('removeImage')
const changeImage = document.getElementById('changeImage')
const uploadHint = document.getElementById('uploadHint')

const textInputs = document.querySelectorAll('.required')

const formData = {
    image: '',
    name: '',
    email: '',
    githubUsername: ''
}

function validateTextInputs(){
    let isValid = true

    textInputs.forEach(input => {
        const hint = input.nextElementSibling

        if(input.value.trim() === ''){
            input.classList.add('error')
            hint.classList.add('error')
            isValid = false
        }else{
            input.classList.remove('error')
            hint.classList.remove('error')

        }
    })

    return isValid
}

function validateFile(input, hint){
    const file = input.files[0]
    let isValid = true

    if(!file){
        hint.classList.add('error')
        hint.innerHtml = 'Please upload an image'
        isValid = false
    }else{
        const validTypes = ['image/jpeg', 'image/png']
        const maxSize = 500 * 1024

        if(!validTypes.includes(file.type)){
            hint.classList.add('error')
            hint.innerHtml = 'Invalid filetype upload a JPG or PNG photo'
            input.value = ''
            isValid = false
        }else if(file.size > maxSize){
            hint.innerHtml = 'File too large. Please upload a photo under 500kb'
            input.value = ''
            isValid = false
        }else{
            hint.classList.remove('error')
            hint.innerHtml = '<img src="assets/images/icon-info.svg" alt=""> Upload your photo (JPG or PNG, max size: 500kb).'
            displayUploadedImage(file)
        }
    }

    return isValid
}

function displayUploadedImage(file){
    const reader = new FileReader()

    reader.onload = e => {
        uploadedImage.src = e.target.result
        fileActions.classList.add('show')
        messageAction.classList.add('hide')
    }

    reader.readAsDataURL(file)
}

function resetUpload(){
    const defaultUploadIcon = 'assets/images.icon-uploaded.svg'

    fileInput.value = ''
    uploadedImage.src = defaultUploadIcon
    messageAction.classList.remove('hide')
    fileActions.classList.remove('show')
    uploadHint.classList.remove('error')
    uploadHint.innerHTML = 'Upload your photo (JPG or PNG, max size: 500kb).'
}

function storeAndDisplayFormData(){
    formData.image = uploadedImage.src
    formData.name = document.getElementById('fullName').value.trim()
    formData.email = document.getElementById('email').value.trim()
    formData.githubUsername = document.getElementById('github').value.trim()

    document.getElementById('headerName').textContent = formData.name
    document.getElementById('displayName').textContent = formData.name
    document.getElementById('displayEmail').textContent = formData.email
    document.getElementById('displayGithub').textContent = formData.githubUsername
    document.getElementById('displayImage').src = formData.image
}

dropArea.addEventListener('click', () => {
    fileInput.click()
})

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault()
    return
})

dropArea.addEventListener('drop', (e) => {
    e.preventDefault()
    
    const files = e.dataTransfer.files
    if(files.length > 0){
        fileInput.files = files
        validateFile(fileInput, uploadHint)
    }
})

fileInput.addEventListener('change', () => {
    validateFile(fileInput, uploadHint)
})

removeImage.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    resetUpload()
})

changeImage.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    fileInput.click()
})

form.addEventListener('submit', e => {
    e.preventDefault()

    const isTextValid = validateTextInputs()
    const isFileValid = validateFile(fileInput, uploadHint)

    if(isTextValid && isFileValid){
        storeAndDisplayFormData()

        document.getElementById('formContent').classList.add('hide')
        document.getElementById('displayData').style.display = 'block'
    }
})