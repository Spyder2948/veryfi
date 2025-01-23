import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import classNames from 'classnames';

const SliderDemo = React.forwardRef(({ className, ...props }, ref) => (
<form>
  <Slider.Root ref={ref} className={className} {...props} minStepsBetweenThumbs={1}>
    <Slider.Track className="SliderTrack">
      <Slider.Range className="SliderRange" />
    </Slider.Track>
    <Slider.Thumb className="SliderThumb" aria-label="Volume"/>
    <Slider.Thumb className="SliderThumb" aria-label="Volume"/>
  </Slider.Root>
</form>
))


export default SliderDemo;