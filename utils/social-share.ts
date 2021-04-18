const socialShare = (provider: 'fb' | 'twitter', url: string = ''): void => {
  url = url ? url : window.location.href;

  switch (provider) {
    case 'fb':
      window.open(
        `https://www.facebook.com/dialog/feed?app_id=${encodeURIComponent(
          '224938085116846'
        )}&link=${encodeURIComponent(url)}`,
        'facebook-share-dialog',
        'width=626,height=436'
      );
      break;
    case 'twitter':
      window.open(
        `https://twitter.com/share?url=${url}`,
        'Twitter-dialog',
        'width=626,height=436'
      );
      break;
    default:
      throw new Error('Unknown provider');
  }
};

export default socialShare;
