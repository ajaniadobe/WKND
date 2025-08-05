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
    const textWrapper = this.fieldDiv.querySelector('.plain-text-wrapper');
    const helpText = this.fieldDiv.querySelector('.field-description');
    if (helpText) {
      this.fieldDiv.append(helpText);
    }
    textWrapper.classList.add(textDecorationClass);
    const intersection = document.createElement('div');
    intersection.classList.add(textIntersectionClass);
    textWrapper.appendChild(intersection);
    this.handleScroll();
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
}
export default async function decorate(apilookupDiv, fieldJson) {
  const apilookup = new ApiLookup(apilookupDiv, fieldJson);
  return apilookup.getfieldDiv();
}
