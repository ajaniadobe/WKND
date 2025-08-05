const textIntersectionClass = 'apilookup__text-intersect';
const textDecorationClass = 'apilookup__text-decoration';

class ApiLookup {
  constructor(fieldDiv, fieldJson) {
    this.fieldDiv = fieldDiv;
    this.fieldJson = fieldJson;
    this.formModel = null;
    this.decorate();
  }

  setFormModel(model) {
    this.formModel = model;
  }

  getfieldDiv() {
    return this.fieldDiv;
  }

  decorate() {
    // const textWrapper = this.fieldDiv.querySelector('.text-wrapper');
    const helpText = this.fieldDiv.querySelector('.field-description');
    if (helpText) {
      this.fieldDiv.append(helpText);
    }
    // textWrapper.classList.add(textDecorationClass);
    // const intersection = document.createElement('div');
    // intersection.classList.add(textIntersectionClass);
    // textWrapper.appendChild(intersection);
    // this.handleScroll();
    this.handleSelectionChanged();
  }

  handleScroll() {
    const intersection = this.fieldDiv.querySelector(`.${textIntersectionClass}`);
    if (intersection) {
      const io = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          /*
          * TODO: Enable the checkboxes that are disabled by default via the model.
          *  Currently they are enabled by default
          * */
          io.unobserve(intersection);
        }
      }, {
        threshold: [1],
      });
      io.observe(intersection);
    }
  }

  handleSelectionChanged() {
    var searchtimer;
    const inputField = this.fieldDiv.querySelector('input[type="text"]');
    var dunsNumberInput = this.fieldDiv.querySelector('#dunsnumber');

    inputField.addEventListener('selectionchange', () => {
      if (!dunsNumberInput || dunsNumberInput.value) {
        dunsNumberInput = document.createElement('input');
        dunsNumberInput.disabled = true;
        dunsNumberInput.id = 'dunsnumber';
        inputField.insertAdjacentElement('afterend', dunsNumberInput);
      }
      clearTimeout(searchtimer); // <--- The solution is here
      searchtimer = setTimeout(() => {
        dunsNumberInput.value = 'DUNS number for ' + inputField.value + ' = ' + inputField.value.hashCode();
        console.log("Selection changed:" + inputField.value);
      }, 1000);
    });
  }
}
export default async function decorate(apilookupDiv, fieldJson) {
  const apilookup = new ApiLookup(apilookupDiv, fieldJson);
  return apilookup.getfieldDiv();
}
