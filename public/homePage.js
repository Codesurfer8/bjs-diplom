

const LogoutBtn = new LogoutButton();

LogoutBtn.action = () => {
    ApiConnector.logout(() => location.reload())
};

ApiConnector.current(
    (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data)
        }
    });

const ratesBoard = new RatesBoard();

ratesBoard.getExchangeCurrancy = function () {
    ApiConnector.getStocks(
        (response) => {
            if (response.success) {
                this.clearTable();
                this.fillTable(response.data);
            }
        }
    )
};

setInterval(function () {
    ratesBoard.getExchangeCurrancy();
}, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(
        data,
        (response) => {
            if (response.success) {
                ProfileWidget.showProfile(response.data);
                this.setMessage(response.success, "Средства зачислены");
            } else {
                this.setMessage(response.success, response.error);
            }
        }
    )
};

moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(
        data,
        (response) => {
            if (response.success) {
                ProfileWidget.showProfile(response.data);
                this.setMessage(response.success, "Средства конвертированы");
            } else {
                this.setMessage(response.success, response.error);
            }
        }
    )
};

moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(
        data,
        (response) => {
            if (response.success) {
                ProfileWidget.showProfile(response.data);
                this.setMessage(response.success, "Средства переведены");
            } else {
                this.setMessage(response.success, response.error);
            }
        }
    )
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(
    (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data)
        }
    }
);

favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(
        data,
        (response) => {
            if (response.success) {
                this.clearTable();
                this.fillTable(response.data);
                moneyManager.updateUsersList(response.data);
                this.setMessage(response.success, "Пользователь добавлен в адресную книгу")
            } else {
                this.setMessage(response.success, response.error);
            }
        }
    )
};

favoritesWidget.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(
        data,
        (response) => {
            if (response.success) {
                this.clearTable();
                this.fillTable(response.data);
                moneyManager.updateUsersList(response.data);
                this.setMessage(response.success, "Пользователь удален из адресной книги")
            } else {
                this.setMessage(response.success, response.error)
            }
        }
    )
};




