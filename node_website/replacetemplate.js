module.exports = (template, data) => {
    let output = template;
    output = output.replace(/{%NAME%}/g, data.name || 'No Name Provided');
    output = output.replace(/{%ICON%}/g, data.icon || '🔧');
    output = output.replace(/{%TECHNOLOGY%}/g, data.technology ? data.technology.join(', ') : 'No Technology Specified');
    output = output.replace(/{%DESCRIPTION%}/g, data.description || 'No Description Provided');
    output = output.replace(/{%GITHUB%}/g, data.github || '#');
    output = output.replace(/{%ID%}/g, data.id || '0'); // Assuming you have a default or error handling ID
    return output;
};
