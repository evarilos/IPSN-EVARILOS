TKN.Card = function(summary, content) {
    this.summary = summary || 'Summary';
    this.content = content || 'Content';
    this.renderElement = undefined;
    this.summaryElement = undefined;
    this.contentElement = undefined;
    this.state = 'closed';
    
    this.renderElement = $('<div class="cards-card card-new"></div>');
    this.render();
};

TKN.Card.method('render', function () {
    var string = '<div class="cards-summary">';
    string += '<h1>' + this.summary + '</h1>';
    string += '</div>';
    this.summaryElement = $(string).appendTo(this.renderElement);
    string = '<div>';
    string += '<p>' + this.content + '</p>';
    string += '</div></div></div>';
    this.contentElement = $(string);
    $('<div class="cards-content"></div>').append(this.contentElement).appendTo(this.renderElement);
});

TKN.Card.method('appendTo', function (elem) {
    var _this = this;
    $(elem).append(this.renderElement);
    this.renderElement.show(500, function () {
        _this.renderElement.removeClass('card-new');
        _this.open();
    });
});

TKN.Card.method('updateContent', function (content) {
    if (content === undefined)
        this.contentElement.html($(this.content)); 
    else
        this.contentElement.html($(content)); 
});

TKN.Card.method('updateSummary', function (summary) {
    if (summary === undefined)
        this.summaryElement.html($('<h1>' + this.summary + '</h1>'));
    else
        this.summaryElement.html($('<h1>' + summary + '</h1>'));
});

TKN.Card.method('update', function () {
    this.updateSummary();
    this.updateContent();
});

TKN.Card.method('setStackReference', function (stackReference) {
    this.stack = stackReference; 
});

TKN.Card.method('close', function () {
    this.contentElement.parent().css('height', '0px');
    this.contentElement.parent().removeClass('open');
    this.state = 'closed';
});

TKN.Card.method('open', function () {
    var childHeight = this.contentElement.css('height');
    this.contentElement.parent().css('height', childHeight);
    this.contentElement.parent().addClass('open');
    this.state = 'open';
});

TKN.Card.method('getClickHandlerElements', function () {
    return this.summaryElement; 
});

TKN.Card.prototype.toString = function () {
    return this.summary;   
};
