import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string().min(5).required(),
        price: Yup.string().required()
    })

export default validationSchema