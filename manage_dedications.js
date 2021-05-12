(() => {
    // Script to hide/show dedication fields on an Engage fundraising forms.
    // An event handler shows/hides by responding to clicks on the dedication buttons.
    // * A click on the None button hides and clears the dedication fields.
    // * A click on the other buttons shows the dedication fields.
    //
    // This script is called by another script that waits for the buttons to appear.
    // Listening for DOMContentReady does not make sense and is not advised.

    const initialize = () => {
        var dedication = document.querySelector("input[name=dedication]")
        var notify = document.querySelector("input[name=field-donationsummary-notify]")
        var notifyParent = notify.parentNode
        var address = document.querySelector("textarea[salsa-reference-name=scf_address_of_recipient_to_notify]")
        var addressParent = address.parentNode
        var env = {

            // Elements to clear before hiding.
            clearThese: [
                dedication,
                notify,
                address
            ],

            // Dedication elements.
            hideThese: [
                dedication,
                notifyParent,
                addressParent
            ],

            // Button values that hide the dedication elements.
            buttonValuesThatHide: [
                "NONE"
            ],

            // Button values that show the dedication elements.
            buttonValuesThatShow: [
                "InHonorOf",
                "InMemoryOf"
            ]
        }
        return env;
    }

    // Clears and hides all of the dedication elements.
    // @param env Object  Runtime environment
    const hideAll = (env) => {
        env.clearThese.forEach((e) => { e.value = "" })
        env.hideThese.forEach((e) => { e.style.display = "none" })
    }

    // Shows all of the dedication elements.
    // @param env Object  Runtime environment
    const showAll = (env) => {
        env.hideThese.forEach((e) => { e.style.display = "" })
    }

    // Uses the value of the specified element to hide or show dedication elements.
    // @param e   Element  Clicked element
    // @param env Object   Runtime environment
    const hideShow = (e, env) => {
        if (e.checked) {
            if (env.buttonValuesThatHide.indexOf(e.value) != -1) {
                hideAll(env)
            } else {
                if (env.buttonValuesThatShow.indexOf(e.value) != -1) {
                    showAll(env)
                } else {
                    console.log(`clickHandler: value ${e.value} does not show or hide.`)
                }
            }
        }
    }

    // Equip the buttons with click handlers. Must be called when the dedication
    // buttons are visible.
    const equip = () => {
        var env = initialize()
        var div = document.querySelector("div[salsa-reference-name=dedication_type]")
        var buttons = div.querySelectorAll('input[type=radio]')
        buttons.forEach((e) => {
            e.addEventListener("click", (event) => {
                hideShow(event.target, env)
            })
            hideShow(e, env)
        })
    }

    // mutationCallback is called when it's time to check for the dedication buttons.
    // If the dedication buttons are there, then they are equipped.
    const mutationCallback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            console.log(`mutationCallback: {mutation}`)
            if (mutation.type === 'childList') {
                var e = document.querySelector("input[type=radio][value=InHonorOf]")
                if (e !== null) {
                    equip()
                    observer.disconnect();
                }
            }
        }
    }

    // Wait for the buttons to appear, then equip them. We'll use a MutationObserver
    // to watch <body> for changes.  That frees us from being bound to a particular
    // web page, a div in a web page, or a single form.
    const waitForButtons = () => {
        const targetNode = document.body;
        const config = { attributes: false, childList: true, subtree: true };
        const observer = new MutationObserver(mutationCallback);
        observer.observe(targetNode, config);
    }
    waitForButtons()
})();
