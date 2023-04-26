import globals from "./globals.js";

export const lenguajeText = [
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
        logOutText: 'Log out'
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
        logOutText: 'Sahioa itxi'
    },
]

export const gameText = [
    {turnText: "'s turn", selectCardText: 'Select a card and put it on the table', decoyText: '(Select a card to decoy)', onePlayerPassedText: 'Only player ' + globals.turnState + ' can play'},
    {turnText: "-ren txanda", selectCardText: 'Karta bat aukeratu eta mahaian ipini', decoyText: '(Karta bat aukeratu decoy egiteko)', onePlayerPassedText: 'Bakarrik ' + globals.turnState + ' jokalariak jolastu dezake'}
]