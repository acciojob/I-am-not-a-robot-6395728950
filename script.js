//your code here
  const images = [
      'https://picsum.photos/id/237/200/300', 'https://picsum.photos/seed/picsum/200/300', 'https://picsum.photos/200/300?grayscale', 'https://picsum.photos/200/300/', 'https://picsum.photos/200/300.jpg'
    ];

    // Select a random image to duplicate
    const duplicateIndex = Math.floor(Math.random() * images.length);
    const duplicateImage = images[duplicateIndex];

    // Make a new array including the duplicate
    const imagePool = [...images, duplicateImage];

    // Shuffle the imagePool array
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    shuffle(imagePool);

    const container = document.getElementById('tiles-container');
    const resetBtn = document.getElementById('reset');
    const verifyBtn = document.getElementById('verify');
    const para = document.getElementById('para');

    let selected = [];

    // Create and display images
    imagePool.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.dataset.id = index;
      img.dataset.src = src;
      img.addEventListener('click', () => handleSelect(img));
      container.appendChild(img);
    });

    function handleSelect(img) {
      if (selected.includes(img) || selected.length >= 2) return;

      img.classList.add('selected');
      selected.push(img);

      if (selected.length === 1) {
        resetBtn.style.display = 'inline';
      } else if (selected.length === 2) {
        verifyBtn.style.display = 'inline';
		  resetBtn.style.display = 'none'
      }
    }

    resetBtn.onclick = () => {
      selected.forEach(img => img.classList.remove('selected'));
      selected = [];
      para.textContent = '';
      verifyBtn.style.display = 'none';
      resetBtn.style.display = 'none';
    };

    verifyBtn.onclick = () => {
      const [first, second] = selected;
      if (first.dataset.src === second.dataset.src) {
        para.textContent = 'You are a human. Congratulations!';
		 selected.forEach(img => img.classList.remove('selected'));
      selected = [];
		  
      } else {
        para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
		    selected.forEach(img => img.classList.remove('selected'));
      selected = [];
		   
      }
      setTimeout(() => para.textContent = '', 2000);
      verifyBtn.style.display = 'none';
    };