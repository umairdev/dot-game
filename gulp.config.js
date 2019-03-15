module.exports = function () {
    const root = './';
    const assetRoot = root + 'src/';
    const handlebarsRoot = assetRoot + 'templates/';
    const distRoot = root + 'dist/';
    const imgRoot = root + 'assets/**/*.*';

    let config = {
        templatePath: handlebarsRoot,
        templatePartialPath: handlebarsRoot + 'partials',
        templateOutputPath: distRoot,
        templates: [
            handlebarsRoot + '**/*.hbs'
        ],
        assetPath: imgRoot
    };

    return config;

};