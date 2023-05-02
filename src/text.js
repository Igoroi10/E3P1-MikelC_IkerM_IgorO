import globals from "./globals.js";

export const lenguageText = [
    {  
        emailText: 'Email', 
        passwordText: 'Password', 
        winrateText: 'Winrate: 46%', 
        gamesWonText: 'Games won: 46', 
        totalGamesText: 'Total games: 100', 
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
        buttonEndRoundText: 'END ROUND',
        buttonNextTurnText: 'NEXT TURN'
    },

    {
        emailText: 'Emaila', 
        passwordText: 'Pasahitza', 
        winrateText: 'Irabazi tasa: 46%', 
        gamesWonText: 'Irabazitako partidak: 46', 
        totalGamesText: 'Jokatutako partidak: 100', 
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
        buttonEndRoundText: 'RONDA AMAITU',
        buttonNextTurnText: 'HURRENGO TXANDA'
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
