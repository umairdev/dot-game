module.exports = function () {
    const root = './';
    const assetRoot = root + 'src/';
    const handlebarsRoot = assetRoot + 'templates/';
    const distRoot = root + 'dist/';

    let config = {
        templatePath: handlebarsRoot,
        templatePartialPath: handlebarsRoot + 'partials',
        templateOutputPath: distRoot,
        templates: [
            handlebarsRoot + '**/*.hbs'
        ]
    };

    return config;

};