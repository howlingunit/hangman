const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function aboutMeHeight() {
    if(window.screen.width > 800){
      await sleep(500);
      const aboutMe = document.querySelector('.about-me');
      aboutMe.style.height = `${aboutMe.scrollHeight + 40}px`
  }
}

async function insertTestimonials() {
  let testimonials = await fetch('/testimonial?amt=2');
  testimonials = await testimonials.json();

  for (let i = 0; i<2; i++) {


    const img = document.querySelector(`#testimonial-${i}-img`);
    const textBox = document.querySelector(`#testimonial-${i}-text`);

    img.style.backgroundImage = `url('assets/reviewers/${testimonials[i].picture}')`;

    const nameBox = document.createElement('h1');
    nameBox.textContent = `${testimonials[i].name}`;
    textBox.appendChild(nameBox);

    const testimonialBox = document.createElement('p');
    testimonialBox.textContent = `"${testimonials[i].testimonial}"`;
    textBox.appendChild(testimonialBox);
  }
}

aboutMeHeight();
insertTestimonials()