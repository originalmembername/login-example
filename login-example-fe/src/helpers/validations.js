import { helpers } from "@vuelidate/validators"

const validations = {
    /**
     * @param {*} regexWithOptionalMessage either a regex string or an object with 'regex' 'message' param for this validation
     * @param {*} message 
     * @returns a validation rule that checks for a regular expression and contains an error message if it's not fulfilled
     */
    fitsExpression: function (regexWithOptionalMessage) {
        //this seems quite complicated, but since there are no tupels in JS, inevitable?!?
        let message = "Invalid input"
        var regex
        if (typeof regexWithOptionalMessage == 'string') {
            //we only have a regex string
            regex = regexWithOptionalMessage
        }
        else {
            //it's an object with regex and message
            regex = regexWithOptionalMessage.regex
            message = regexWithOptionalMessage.message
        }
        var rule = helpers.withParams(
            { type: 'fitsExpression', value: regex },
            (value) => {
                return regex.test(value)
            },
        )
        rule.$message = message
        return rule
    },
    letters_or_numbers: {
        regex: /^[a-zA-Z0-9äöüÄÖÜ]*$/,
        message: "Only letters or numbers"
    },
    contains_uppercase: {
        regex: /[A-Z]/,
        message: "Input must contain uppercase character"
    },
    contains_lowercase: {
        regex: /[a-z]/,
        message: "Input must contain lowercase character"
    },
    contains_number: {
        regex: /[0-9]/,
        message: "Input must contain number"
    },
    contains_special_char: {
        regex: /[#?!@$€%^&*-]/,
        message: "Input must contain special character"
    },
    no_spaces: {
        regex: /^\S*$/,
        message: "Input mustn't contain spaces"
    }
}

export default validations

