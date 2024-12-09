/**
 * Switches the current active tab (srcTab) to destTab. Make sure to set
 * the local current tab variable to the return.
 * 
 * If the srcTab and destTab are the same object, then the tab is returned
 * without calling any functions.
 * 
 * The srcTab and destTab parameters are required to have the following properties:
 * btn - the HTML element button
 * root - the HTML root element to style with the activeClass
 * 
 * Additonal optional properties:
 * open - a function that is passed the destTab data. Called when the tab is switched to.
 * close - a function that is passed the srcTab data. Called when the tab is switched from. 
 * Executes before the open function.
 * 
 * @param {Object} srcTab 
 * @param {Object} destTab 
 * @param {String} activeClass 
 * @returns the new current tab.
 */
export function switchTab(srcTab, destTab, activeClass="active") {
    if (srcTab === destTab) {
        return srcTab;
    }

    switchActive([srcTab.btn, srcTab.root], [destTab.btn, destTab.root], activeClass);
    
    if (srcTab.close != null) {
        srcTab.close(srcTab);
    }
    
    destTab.open(destTab);
    return destTab;
}

/**
 * Toggles the provided activeClass off for the srcElems and on for the destElems.
 * @param {Array} srcElems 
 * @param {Array} destElems 
 * @param {String} activeClass 
 */
export function switchActive(srcElems, destElems, activeClass="active") {
    srcElems.forEach(elem => elem.classList.remove(activeClass));
    destElems.forEach(elem => elem.classList.add(activeClass));
}