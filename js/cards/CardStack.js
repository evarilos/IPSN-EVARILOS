TKN.CardStack = function(options) {
    var _this = this;
    this.cards = [];
    this.cardStates = [];
    this.numberOfCards = 0;
    this.renderTo = options.renderTo;
    
    $(this.renderTo).hover(function () {
        _this.restore(); 
    });
}

TKN.CardStack.method('addCard', function (card) {
    var _this = this;
    card.setStackReference(this);
    this.cards.push(card);
    this.cardStates.push('open');
    card.appendTo(this.renderTo);

    var el = card.getClickHandlerElements();
    el.on('click', this.numberOfCards, function (event) {
        if (_this.cardStates[event.data] === 'open') {
            _this.cards[event.data].close();
            _this.cardStates[event.data] = 'closed';
        } else {
            _this.cards[event.data].open();
            _this.cardStates[event.data] = 'open';
        };
    });
    this.numberOfCards += 1;
});

TKN.CardStack.method('countCards', function () {
    return this.numberOfCards;
});

TKN.CardStack.method('minify', function () {
    var _this = this;
    $.each(_this.cards, function (index, value) {
        _this.cards[index].close();
    });
});
                     
TKN.CardStack.method('restore', function () {
    var _this = this;
    $.each(_this.cards, function (index, value) {
        if (_this.cardStates[index] === 'open')
            _this.cards[index].open();
    });
});

TKN.CardStack.method('close', function (index) {
    this.cards[index].close();
    this.cardStates[index] = 'closed';
});

TKN.CardStack.method('open', function (index) {
    this.cards[index].open();
    this.cardStates[index] = 'open';
});
                     
TKN.CardStack.method('collapseAll', function () {
    var _this = this;
    $.each(_this.cards, function (index, value) {
        _this.cards[index].close();
        _this.cardStates[index] = 'closed';
    });
});

TKN.CardStack.method('expandAll', function () {
    var _this = this;
    $.each(_this.cards, function (index, value) {
         _this.cards[index].open();
        _this.cardStates[index] = 'open';
    });
});

$('#logo').on('click', function () {
    var card = new TKN.Card('Copyright <sup>©2014</sup>', 'Created by <a href="mailto:leinfelder@tkn.tu-berlin.de">Florian Leinfelder</a> for <a target="_blank" href="http://www.tkn.tu-berlin.de">TKN</a>');
    TKN.cardStack.addCard(card);
});
