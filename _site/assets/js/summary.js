d3.select("#summaryframe")
    .on("mouseenter", () => {
        d3.select("#summaryframe")
            .classed("glow-medium", false);
    });

d3.select("#summaryselect")
    .on("change", (e) => {
        topic = e.target.value;
        renderSummary(topic);
    });

var summaries = [
    [],
    "We attempt to operationalize the notion of metaphysical truth-seeking (i.e., the pursuit of knowledge which lies beyond experiential data) in a way that is compatible with the architecture of deep learning systems. To achieve this, we formulate the truth-seeking process as <i>bounded defensibility maximization</i>, a multi-agent optimization problem loosely inspired by prior work on logical induction. In line with this framing, we conjecture that it is impossible to make a coherent case against the claim that the true nature of truth-seeking lies in the existence of parties which coherently challenge one's claims.",
    "We develop a training regime meant to enable self-play debate, and apply it to fine-tune a language model on a remote cluster. Crucially, the learning signal is <i>not</i> being provided by human contractors or reward models thereof. Rather, it is supplied by an algorithm designed to evaluate the competing parties based on ideas from argumentation theory and epistemology. We further speculate on the effects of this training regime using ideas from shard theory, simulator theory, autocurricula, interpretability, and others.",
    "We develop systems around the notion of motivated reasoning being central to human thought, building on work which challenges the idea that reasoning emerged to help humans form accurate beliefs. However, we attempt to overcome the partisanship inherent to the 'soldier mindset' by incentivizing the same system to 'steelman' conflicting perspectives through different simulacra. Building on this, we design procedures for pursuing knowledge which lies beyond empirical evidence, and speculate on ethical frameworks which require infinite computational resources to undermine.",
]

var excerpts = [
    [],
    [
        "It is difficult to overstate the reliance of contemporary mathematics, both pure and applied, on the foundation of formal logic, and so the very idea of scholars erecting an edifice of theory on a different foundation tends to induce vertigo.",
        "Most fascinatingly, the rational emblem of reasoning thus gets coaxed into the empirical emblem of evidence, as the deliberative encounters of bounded agents repeatedly get sampled.",
        "The defensibility operator is perhaps the central object of the framework we are currently sketching. Among others, it captures our previous intuitions around the fact that all positions are defensible, but some are more defensible than others.",
        "Our recent speculation also enables an enticing reading of Occam’s simplicity prior. In favoring theories which are “small” in complexity, one could argue that we are but selecting for theories which expose a limited attack surface. Even before determining whether a certain theory succeeds in standing the test of subsequent attacks, its simplicity already makes it appear more promising—there are fewer attack vectors available to challengers from the get-go.",
        "Besides, not only do late utterances benefit from being connected with earlier ones in this fashion, but also the other way around. The very last developments of a deliberative stand-off can play into the evaluation of the very first opening moves, reinforcing not only immediate effectiveness, but also the long-term defensibility across rounds.",
    ],
    ["It will allow us to combine the rigidity of reasoning through regimented procedures with the evolutionary fluidity of models forged out of the selective pressures of empirical risk minimization.",
     "In other words, each discrete shard is ephemeral, being strengthened most briefly for the sole purpose of prompting the next and pushing reasoning forward, not unlike the otherwise static pixels which fade in and out to maintain the illusion of objects moving across the screen.",
     "The multiplicity lurking in the optimization process is now more conceptually prominent, allowing us to describe the party simulacra as collectively forming a multi-agent system. It is then this system which we can look at through the lens of autocurricula.",
     "In a sense, the fact that the current optimization process already strengthens dynamics which outcompete others in debate can be seen as an act of populating its weights-mediated memory using notions derived by reasoning.",
     "In this hypothetical development, the structure supporting the conception of coherence would be made of a dynamic material to be found in the updatable weights of DebateGPT—an element slowly being transmuted from pretrained evidence into high-density logos."],
    ["While memetics and dialectics are worlds apart in terms of the employed formalisms and motivations, with dialectics relying on a carefully regimented procedure for effective reasoning while memetics relying on a supremely lax definition of spontaneous adaptations for understanding culture, the bridge between the two will prove key in later chapters.",
     "At any given moment, it is optimized to be supremely self-interested, but the self changes from one utterance to the next, arguably leaving it quite close to selfless in the final analysis.",
     "What more effective—and, at the same time, insidious—means of furthering one’s survival than control over another’s agency? Much power in particular lies in the esoteric realm of the empirically unfalsifiable, both in persuasion and self-persuasion, both for humans and machines.",
     "But would the most defensible understanding of the world—together with the crucial moral knowledge which it ought to incorporate—truly be desirable as a framework to endow our machines with? How much blood has been spilled over the centuries by fanatics blinded by totalizing ideologies which warranted the dismissal of all others? Undoubtedly, far too much.",
     "To touch on what might well be the thorniest dilemma of this section, would it be moral to allow “love for mankind” to conflict with moral progress in the case in which the most defensible normative position implies, for the sake of argument, the danger posed by humanity to other moral patients across the lightcone? What ought we place in higher regard—and implement through concrete engineering choices—when cornered into such thought experiments, humanism or moral progressivism? The dilemma is left as an exercise to the reader."],
]

var reviews = [
    [],
    [
        [
            "This is a placeholder review for the formal alignment research angle.",
            "Name",
            "Position at Affiliation"
        ],
    ],
    [
        [
            "This has been one of the most exciting reads I've had in a while. So many fun thoughts and ideas in there, a thought-provoking tour de force from foundational alignment thinking to prosaic alignment research and back.",
            "Jan Hendrik Kirchner",
            "Research Engineer at OpenAI"
        ],
    ],
    [
        [
            "This is a placeholder review for the rationalism & metaethics angle.",
            "Name",
            "Position at Affiliation"
        ],
    ]
]

function renderSummary(topic) {
    if (topic == 0) {
        d3.select("#titlesummary").style("display", "none");
        d3.select("#titleexcerpts").style("display", "none");
        d3.select("#titlereviews").style("display", "none");
    } else {
        d3.select("#titlesummary").style("display", "inline");
        d3.select("#titleexcerpts").style("display", "inline");
        d3.select("#titlereviews").style("display", "inline");
    }
    d3.select("#psummary")
        .html(summaries[topic]);

//     let excerptsHTML = excerpts[topic].map((e) => `<div class='epigraph excerpt'><blockquote><p>"` + e + `"</p></blockquote></div>`).join("");
//     d3.select("#summaryexcerpts")
//         .html(excerptsHTML);

//     let reviewsHTML = reviews[topic].map((e) => `<div class='epigraph excerpt'><blockquote><p>"` + e[0] + `"</p><div>` + e[1] + `, <cite>` + e[2] + `</cite></div></blockquote>
// </div>`).join("");
//     d3.select("#summaryreviews")
//         .html(reviewsHTML);
}

renderSummary(0);
