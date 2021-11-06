import { isOfferedLanguage } from './languageUtils';

function redirectsUtil(props, checks) {
    let redirection;
    const checksPassed = checks.every((checkObj) => {
        switch (checkObj.check) {
            case 'language':
                redirection = checkObj.redirection;
                return isOfferedLanguage(props.language);
            case 'page':
                redirection = checkObj.redirection;
                return props.p;
            case 'logged-in':
                redirection = checkObj.redirection;
                return props.token;
            case 'logged-out':
                redirection = checkObj.redirection;
                return !props.token;
            case 'admin':
                return true;
            default:
                return true;
        }
    })
    switch (checksPassed) {
        case true:
            return { props };
        case false:
            return {
                redirect: {
                    permanent: false,
                    destination: redirection
                }
            }
    }
}

export default redirectsUtil;