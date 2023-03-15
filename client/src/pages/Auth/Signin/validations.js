import * as Yup from 'yup'

const validations = Yup.object().shape({
    email: Yup.string().email('Geçerli bir email giriniz').required("Lüften doldurunuz"),
    password: Yup.string().min(5, "En az 5 karakter olmalıdır").required()
})

export default validations 