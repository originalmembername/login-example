import { helpers } from "@vuelidate/validators"

const validations = {
    fitsExpression: function(regex) {
        var rule = helpers.withParams( 
            { type: 'fitsExpression', value: regex},
            (value) => {
                return regex.test(value)
            },      
        )
        rule.$message = "Invalid Input" //TODO: customize
        return rule
    },
    letters_or_numbers: /^[a-zA-Z0-9äöüÄÖÜ]*$/,
    contains_uppercase: /[A-Z]/,
    contains_lowercase: /[a-z]/,
    contains_number: /[0-9]/,
    contains_special_char: /[#?!@$€%^&*-]/,
    no_spaces: /^\S*$/
}

export default validations

