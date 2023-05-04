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
        buttonEndRoundText: 'END ROUND',
        buttonNextTurnText: 'NEXT TURN',
        logInText: 'Log in'
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
        buttonEndRoundText: 'RONDA AMAITU',
        buttonNextTurnText: 'HURRENGO TXANDA',
        logInText: 'Sahioa hasi'
    },
]

export const gameText = [
    {
        turnText: "'s turn", 
        selectCardText: 'Select a card', 
        placeCardText: 'Place the choosen card in an empty slot',
        decoyText: '(Select a card if you want to do the decoy effect or you can change turn)', 
        onePlayerPassedText: 'Only player ' + globals.turnState + ' can play',
        earnedPointsText: 'You have earned ',
        earnedPoints2Text: ' points.', 
        losePointsText: 'you have lost' + globals.earnedPlayer1Points + ' points.',
    },

    {
        turnText: "-ren txanda", 
        selectCardText: 'Karta bat aukeratu', 
        placeCardText: 'Aukeratutako karta argiztatutako hutsune batean ipini',
        decoyText: '(Karta bat aukeratu docoy efektua egin nahi baduzu, bestela txanda pasa)', 
        onePlayerPassedText: 'Bakarrik ' + globals.turnState + '. jokalariak jokatu dezake',
        earnedPoints2Text: ' puntu irabazi dituzu.', 
        losePointsText: globals.earnedPlayer1Points +  ' puntu galdu dituzu.',
    }
]
