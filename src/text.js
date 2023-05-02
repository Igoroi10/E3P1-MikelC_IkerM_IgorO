import globals from "./globals.js";

export const lenguageText = [
    {  
        emailText: 'Email', 
        passwordText: 'Password', 
        winrateText: 'Winrate', 
        gamesWonText: 'Games won', 
        totalGamesText: 'Total games', 
        userListText: 'Users List', 
        selectDifficultText: 'Select game difficult:', 
        normalButtonText: 'Normal', 
        expertButtonText: 'Expert', 
        logOutText: 'Log out',
        forgotPasswordBox: 'Forgot Your Password?',
        dontHaveAccountText: "Don't have a account",
        forgotPasswordText: 'Forgot Password',
        confirmPasswordText: 'Confirm Password',
        submitText: 'SUBMIT',
        nameSurnameText: 'Name & Surname',
        registerText: 'Register',
        backText: 'Back',
        errorMensajeText: 'The username or password are incorrect. Please try again.',
        buttonEndRoundText: 'End Round',
        buttonNextTurnText: 'Next Turn'
    },

    {
        emailText: 'Emaila', 
        passwordText: 'Pasahitza', 
        winrateText: 'Irabazi tasa', 
        gamesWonText: 'Irabazitako partidak', 
        totalGamesText: 'Jokatutako partidak', 
        userListText: 'Erabiltzaile zerrenda', 
        selectDifficultText: 'Partidaren zailtasuna aukeratu:', 
        normalButtonText: 'Normala', 
        expertButtonText: 'Aditua', 
        logOutText: 'Sahioa itxi',
        forgotPasswordBox: 'Pasahitza ahaztu zaizu?',
        dontHaveAccountText: "Ez daukazu sahiorik Erregistratu",
        forgotPasswordText: 'Pasahitza ahaztuta',
        confirmPasswordText: 'Pasahitza egiaztatu',
        submitText: 'BIDALI',
        nameSurnameText: 'Izen Abizena',
        registerText: 'Erregistratu',
        backText: 'Atzera',
        errorMensajeText: 'Erabiltzailea edo pasahitza gaizki daude. Mesedez berriz saiatu.',
        buttonEndRoundText: 'Ronda Amaitu',
        buttonNextTurnText: 'Hurrengo Txanda'
    },
]

export const gameText = [
    {
        turnText: "'s turn", 
        selectCardText: 'Select a card and put it on the table', 
        decoyText: '(Select a card to decoy)', 
        onePlayerPassedText: 'Only player ' + globals.turnState + ' can play'
    },

    {
        turnText: "-ren txanda", 
        selectCardText: 'Karta bat aukeratu eta mahaian ipini', 
        decoyText: '(Karta bat aukeratu decoy egiteko)', 
        onePlayerPassedText: 'Bakarrik ' + globals.turnState + '. jokalariak jokatu dezake'
    }
]
