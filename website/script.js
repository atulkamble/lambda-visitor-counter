const API_URL = "https://wiig3hh7s4.execute-api.us-east-1.amazonaws.com/prod/count";

let lastCount = 0;

function animateCount(el, start, end, duration = 800) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(start + range * progress);
        el.textContent = value.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

async function fetchVisitorCount() {

    const counter = document.getElementById("visitor-count");
    const sub = document.getElementById("counter-sub");
    const btn = document.getElementById("refresh-btn");

    btn.disabled = true;
    counter.textContent = "...";
    sub.textContent = "Loading...";

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        console.log(result);

        // Support both response formats
        const count =
            result.count ??
            result.visitorCount ??
            JSON.parse(result.body || "{}").count ??
            JSON.parse(result.body || "{}").visitorCount;

        animateCount(counter, lastCount, Number(count));

        lastCount = Number(count);

        sub.textContent =
            "Last Updated : " + new Date().toLocaleTimeString();

    } catch (err) {

        console.error(err);

        counter.textContent = "Error";
        sub.textContent = err.message;

    } finally {

        btn.disabled = false;

    }

}

document.addEventListener("DOMContentLoaded", fetchVisitorCount);