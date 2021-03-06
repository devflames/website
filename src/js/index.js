import $ from 'jquery';
import 'jquery-ui/ui/widgets/tabs';
import Typed from 'typed.js';
import { downloader } from './downloadMore';

const dropDownFunc = (id) => {
  $(`#${id}`).closest('.dropdown').toggleClass('show');
};


const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected = document.getSelection().rangeCount > 0
    ? document.getSelection().getRangeAt(0)
    : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

window.addEventListener('click', (event) => {
  if (!event.target.matches('.dropdown__button')) {
    $('.dropdown').each(function () {
      $(this).removeClass('show');
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if ('fonts' in document) {
    const regular = new FontFace('LabGrotesque', "url(/fonts/LabGrotesque-Regular-hint-all.woff) format('woff')");
    regular.load().then((font) => {
      document.fonts.add(font);
    });
  }
  const typedId = 'typed';
  const typedElement = document.getElementById(typedId);

  if (typedElement) {
    new Typed(`#${typedId}`, {
      stringsElement: '#typed-strings',
      typeSpeed: 40,
      backSpeed: 15,
      backDelay: 1200,
      loop: true,
    });
  }

  $('.dropdown .dropdown__button').each(function (e) {
    this.addEventListener('click', (e) => {
      dropDownFunc(e.target.dataset.targetId);
    });
  });

  $('.eg-navbar__trigger').click(() => {
    $('html').toggleClass('show-main-nav');
  });

  $('.tabs').tabs();

  if (document.getElementsByClassName('download').length > 0) {
    downloader('download', 6);
  }

  if (document.getElementsByClassName('related').length > 0) {
    downloader('related', 3);
  }

  if (document.getElementsByClassName('copy-link').length > 0) {
    $('.copy-link').click((e) => {
      e.preventDefault();
      copyToClipboard(e.currentTarget.href);
    });
  }

  if (document.getElementsByClassName('expandableCollapsibleDiv').length > 0) {
    $('.expandableCollapsibleDiv h3').click((e) => {
      const showElementDescription = $(e.currentTarget).parent('.expandableCollapsibleDiv').find('p');
      const elementTitle = $(e.currentTarget).parent('.expandableCollapsibleDiv').find('h3');

      if ($(showElementDescription).is(':visible')) {
        elementTitle.removeClass('active');
        showElementDescription.slideUp();
      } else {
        showElementDescription.slideDown();
        elementTitle.addClass('active');
      }
    });
  }
});
