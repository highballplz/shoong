const propertiesToBeMerged = ['textColor', 'bgColor'];

const defaultColors = [
  'inherit',
  'current',
  'transparent',
  'black',
  'white',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];

const customColors = Object.keys({
  primary: 'rgba(102, 98, 201, 1)',
  secondary: 'rgba(124, 120, 224, 1)',
  tertiary: 'rgba(210, 202, 250, 1)',
  negative: 'rgba(225, 25, 0, 1)',
  contentPrimary: 'rgba(32, 33, 35, 1)',
  contentSecondary: 'rgba(109, 112, 126, 1)',
  contentTertiary: 'rgba(157, 161, 180, 1)',
  gray100: 'rgba(241, 241, 241, 1)',
  gray200: 'rgba(210, 210, 210, 1)',
  gray300: 'rgba(172, 171, 173, 1)',
  gray400: 'rgba(136, 135, 137, 1)',
  gray500: 'rgba(82, 82, 82, 1)',
  gray600: 'rgba(52, 52, 52, 1)',
});

const colors = [...defaultColors, ...customColors];

export default function mergeTailwindClassNames(
  defaultClassName,
  customClassName
) {
  //string으로 된 통짜 className을 array인 classNames로 변환
  const defaultClassNames = defaultClassName.split(' ');
  const customClassNames = customClassName.split(' ');

  //classNames 배열을 classNameMap 객체로 변환 (단 예를 들어 text-red와 bg-red는 textColor: red와 bgColor: red로.)
  const defaultClassNameMap = classNamesToClassNameMap(defaultClassNames);
  const customClassNameMap = classNamesToClassNameMap(customClassNames);

  //예를 들어, 만약 defaultClassNameMap과 customClassNameMap 모두에 textColor 프로퍼티가 있다면 defaultClassNameMap에서는 textColor 프로퍼티 삭제
  propertiesToBeMerged.forEach((property) => {
    if (isSharedProperty(defaultClassNameMap, customClassNameMap, property))
      delete defaultClassNameMap[property];
  });

  //defaultClassNameMap 객체를 defaultClassNames 배열로 변환 (단 propertiesToBeMerged 이름은 원래 tailwind property 이름으로.)
  const thinnerDefaultClassNames =
    ClassNameMapToClassNames(defaultClassNameMap);
  const mergedClassNames = `${thinnerDefaultClassNames.join(' ')} ${customClassNames.join(' ')}`;

  return mergedClassNames;
}

function classNamesToClassNameMap(classNames) {
  const classNameMap = {};
  classNames.forEach((className) => {
    //예를 들어 'bg-red-100'을 ['bg','red','100']으로 만들어서 각 엔트리를 차례대로 property, value1, value2로 놓기.
    let [property, value1, value2] = className.split('-');

    //예를 들어 'bg-red-100'의 'bg'를 'bgColor'로 수정
    if (colors.includes(value1)) {
      switch (property) {
        case 'text':
          property = 'textColor';
          break;
        case 'bg':
          property = 'bgColor';
          break;
      }
    }

    classNameMap[property] = !value2
      ? `${value1}` //만약 value1도 없다면 그냥 ''이 들어감
      : `${value1}-${value2}`;
  });

  return classNameMap;
}

function isSharedProperty(obj1, obj2, property) {
  return hasProperty(obj1, property) && hasProperty(obj2, property);
}

function hasProperty(obj, property) {
  return Object.keys(obj).includes(property);
}

function ClassNameMapToClassNames(ClassNameMap) {
  const classNames = [];

  Object.entries(ClassNameMap).forEach((classEntry, index) => {
    let [property, value] = classEntry;
    switch (property) {
      case 'textColor':
        property = 'text';
        break;
      case 'bgColor':
        property = 'bg';
        break;
    }
    classNames[index] = `${property}-${value}`;
  });

  return classNames;
}
