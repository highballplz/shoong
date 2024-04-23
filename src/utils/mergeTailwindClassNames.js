const textAlign = [
  'text-left',
  'text-center',
  'text-right',
  'text-justify',
  'text-start',
  'text-end',
];

const textWrap = ['text-wrap', 'text-nowrap', 'text-balance', 'text-pretty'];

const textOverflow = ['truncate', 'text-ellipsis', 'text-clip'];

export default function mergeTailwindClassNames(
  defaultClassName,
  customClassName
) {
  const defaultClasses = defaultClassName.split(' ');
  const customClasses = customClassName.split(' ');

  //customClassNameMap 생성
  const customClassNameMap = {};
  customClasses.forEach((className) => {
    const [property, value1, value2] = className.split('-');
    customClassNameMap[property] = !value2
      ? `${value1}`
      : `${value1}-${value2}`;
  });

  //defaultClassNameMap 생성하되, customClassNameMap에 없는 property에 대해서만 value 주기
  const defaultClassNameMap = {};
  defaultClasses.forEach((className) => {
    let [property, value1, value2] = className.split('-');
    switch (property) {
      case 'text':
        if (textAlign.includes(className)) {
          property = 'textAlign';
        } else if (textWrap.includes(className)) {
          property = 'textWrap';
        } else if (textOverflow.includes(className)) {
          property = 'textOverflow';
        } else {
          property = 'textColor';
        }
    }
    defaultClassNameMap[property] = !value2
      ? `${value1}`
      : `${value1}-${value2}`;
  });

  const mergedClassNameMap = { ...customClassNameMap, ...defaultClassNameMap };
  const mergedClasses = [];
  Object.entries(mergedClassNameMap).forEach((classEntry, index) => {
    const [property, value] = classEntry;
    mergedClasses[index] = `${property}-${value}`;
  });

  return mergedClasses.join(' ');
}
