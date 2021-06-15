/* link to source https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

function getRandomIntegerInclusive (min, max)
{
  let swap=0;

  if (max<min)
  {
    swap=min;
    min=max;
    max=swap;
  }

  min=Math.ceil(min);
  max=Math.floor(max);
  return Math.floor(Math.random()*(max-min+1))+min;
}

function getRandomFloat(minInclusive, maxInclusive, precision)
{
  let swap=0;

  if (maxInclusive<minInclusive)
  {
    swap=minInclusive;
    minInclusive=maxInclusive;
    maxInclusive=swap;
  }

  maxInclusive = Math.ceil(maxInclusive/(1/Math.pow(10, precision)));
  minInclusive = Math.floor(minInclusive/(1/Math.pow(10, precision)));
  const randomNumber = Math.floor(Math.random()*(maxInclusive - minInclusive + 1)) + minInclusive;
  return randomNumber / Math.pow(10, precision);
}

getRandomIntegerInclusive(1,100);
getRandomFloat(1.1, 1.9, 5);
