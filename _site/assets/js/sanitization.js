d3.select("#sanitizationframe")
    .on("mouseenter", () => {
        d3.select("#sanitizationframe")
            .classed("glow-medium", false);
    });

function isAlpha(ch){
    return /^[A-Za-z]*$/.test(ch);
}

function isUpper(str) {
    return str === str.toUpperCase();
}

d3.select("#sanitizationinput")
    .on("input", (e) => {
        var plain = e.target.value.replace(/[\.,'\!\?\-]/g, "");
        splitted = plain.split(/(\s+)/).filter( e => e.trim().length > 0);
        var legal = splitted.every(v => isAlpha(v) === true);
        var long_enough = splitted.length > 4 && splitted.length < 25;
        var start_capital = isUpper(plain.trim()[0]) && isAlpha(plain.trim()[0]);
        var one_sent = (e.target.value.match(/[\.\!\?]/g) || []).length == 1;

        if (legal) {
            d3.select("#sanitizationletters")
                .text("✓");
        } else {
            d3.select("#sanitizationletters")
                .text("✗");
        }

        if (one_sent) {
            d3.select("#sanitizationpunctuation")
                .text("✓");
        } else {
            d3.select("#sanitizationpunctuation")
                .text("✗");
        }

        if (start_capital) {
            d3.select("#sanitizationcapital")
                .text("✓");
        } else {
            d3.select("#sanitizationcapital")
                .text("✗");
        }

        if (long_enough) {
            d3.select("#sanitizationlength")
                .text("✓");
        } else {
            d3.select("#sanitizationlength")
                .text("✗");
        }

        if (legal && one_sent && start_capital && long_enough) {
            d3.select("#sanitizationlegal")
                .text("✓");
        } else {
            d3.select("#sanitizationlegal")
                .text("✗");
        }
    });
