TKN.ExperimentInfoCard = function (data) {
    var _this = this;
    this.data = data;
    this.summary = 'Experiment Info';
    this.content = '<p>loading...</p>';
    this.updateSummary();
    this.updateContent();
    
    var content = '<p><em>System ID:</em> ' + data.system_id + '<p>';
    content += '<p><em>Competitor:</em> ' + data.sut.competitor_name + '</p>';
    content += '<p><em>Name:</em> ' + data.sut.sut_name + '</p>';
    content += '<p><em>Link:</em> <a target="_blank" href="' + data.sut.link + '">Link</a></p>';
    _this.updateContent(content);
};

TKN.ExperimentInfoCard.inherits(TKN.Card);
