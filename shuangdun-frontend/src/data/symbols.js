import { datasetFiles } from './datasetFiles.js'

export const symbolCategories = [
  { value: 'all', label: '全部' },
  { value: '天文', label: '天文' },
  { value: '地理', label: '地理' },
  { value: '动植物', label: '动植物' },
  { value: '生产生活', label: '生产生活' },
  { value: '其他', label: '其他' },
]

export const formTypes = [
  { value: 'all', label: '全部' },
  { value: '象形', label: '象形' },
  { value: '指事', label: '指事' },
  { value: '会意', label: '会意' },
]

// 37 双墩刻符 — AI 生成图像来自 FontDiffuser 条件扩散模型
export const symbols = [
  // ===== 天文 =====
  {
    id: 'sd_001', name: '日', image: '/dataset/日/日_0001_hand.png',
    category: '天文', formType: '象形',
    description: '表示"日"的符号，呈圆形带有内部刻画。双墩先民对太阳的崇拜体现于陶片刻符之上。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_002', name: '虹', image: '/dataset/虹/虹_0001_hand.png',
    category: '天文', formType: '象形',
    description: '表示"虹"的符号，以弧形双线描绘彩虹跨越天空的形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },

  // ===== 地理 =====
  {
    id: 'sd_003', name: '山', image: '/dataset/山/山_0001_hand.png',
    category: '地理', formType: '象形',
    description: '表示"山"的符号，以起伏的轮廓线描绘山峰连绵的形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_004', name: '水', image: '/dataset/水/水_0001_hand.png',
    category: '地理', formType: '象形',
    description: '表示"水"的符号，以波浪形线条表现流水意象。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_005', name: '丘', image: '/dataset/丘/丘_0001_hand.png',
    category: '地理', formType: '象形',
    description: '表示"丘"的符号，描绘土丘或小山的轮廓形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_006', name: '阜', image: '/dataset/阜/阜_0001_hand.png',
    category: '地理', formType: '象形',
    description: '表示"阜"的符号，描绘土山、丘陵或阶梯状地貌。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },

  // ===== 动植物 =====
  {
    id: 'sd_007', name: '鱼', image: '/dataset/鱼/鱼_0001_hand.png',
    category: '动植物', formType: '象形',
    description: '表示"鱼"的符号，保留鱼头、鱼身、鱼尾的基本轮廓，形态生动。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_008', name: '鹿', image: '/dataset/鹿/鹿_0001_hand.png',
    category: '动植物', formType: '象形',
    description: '表示"鹿"的符号，突出鹿角和身体特征，反映狩猎生活中常见动物。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_009', name: '豕', image: '/dataset/豕/豕_0001_hand.png',
    category: '动植物', formType: '象形',
    description: '表示"豕"（猪）的符号，描绘猪的形态，反映家畜饲养。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_010', name: '虫', image: '/dataset/虫/虫_0001_hand.png',
    category: '动植物', formType: '象形',
    description: '表示"虫"的符号，描绘蛇或虫类的弯曲形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_011', name: '花', image: '/dataset/花/花_0001_hand.png',
    category: '动植物', formType: '象形',
    description: '表示"花"的符号，描绘植物花朵的形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_012', name: '草', image: '/dataset/草/草_0001_hand.png',
    category: '动植物', formType: '象形',
    description: '表示"草"的符号，以细线描绘草木生长的形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_013', name: '叶', image: '/dataset/叶/叶_0001_hand.png',
    category: '动植物', formType: '象形',
    description: '表示"叶"的符号，描绘植物叶片的形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },

  // ===== 生产生活 =====
  {
    id: 'sd_014', name: '人', image: '/dataset/人/人_0001_hand.png',
    category: '生产生活', formType: '象形',
    description: '表示"人"的符号，以简洁的线条描绘人体的侧面形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_015', name: '田', image: '/dataset/田/田_0001_hand.png',
    category: '生产生活', formType: '会意',
    description: '表示"田"的符号，由分格的矩形构成，反映原始农业和土地划分。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_016', name: '网', image: '/dataset/网/网_0001_hand.png',
    category: '生产生活', formType: '会意',
    description: '表示渔网的符号，由交叉线条组成网状图案，反映双墩先民的渔猎生活。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_017', name: '束', image: '/dataset/束/束_0001_hand.png',
    category: '生产生活', formType: '会意',
    description: '表示"束"的符号，描绘捆扎物品的形态，反映日常生活。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_018', name: '丝', image: '/dataset/丝/丝_0001_hand.png',
    category: '生产生活', formType: '象形',
    description: '表示"丝"的符号，以纤细线条描绘蚕丝缠绕的形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_019', name: '糸', image: '/dataset/糸/糸_0001_hand.png',
    category: '生产生活', formType: '象形',
    description: '表示"糸"（细丝）的符号，以缠绕线条描绘丝线的形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_020', name: '钩', image: '/dataset/钩/钩_0001_hand.png',
    category: '生产生活', formType: '象形',
    description: '表示"钩"的符号，描绘弯曲的钩形工具，用于渔猎或悬挂。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_021', name: '箭', image: '/dataset/箭/箭_0001_hand.png',
    category: '生产生活', formType: '象形',
    description: '表示"箭"的符号，描绘箭矢的形态，反映狩猎工具的刻画。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_022', name: '矢', image: '/dataset/矢/矢_0001_hand.png',
    category: '生产生活', formType: '象形',
    description: '表示"矢"（箭）的符号，与"箭"同义，箭镞与箭杆的简洁刻画。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_023', name: '甲', image: '/dataset/甲/甲_0001_hand.png',
    category: '生产生活', formType: '象形',
    description: '表示"甲"的符号，描绘龟甲或护甲的形态，亦为天干第一位。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_024', name: '癸', image: '/dataset/癸/癸_0001_hand.png',
    category: '生产生活', formType: '象形',
    description: '表示"癸"的符号，天干第十位，形态似兵器或工具。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_025', name: '桥', image: '/dataset/桥/桥_0001_hand.png',
    category: '生产生活', formType: '会意',
    description: '表示"桥"的符号，描绘桥梁的结构形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_026', name: '房', image: '/dataset/房/房_0001_hand.png',
    category: '生产生活', formType: '象形',
    description: '表示"房"的符号，描绘房屋或居所的轮廓形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_027', name: '仓', image: '/dataset/仓/仓_0001_hand.png',
    category: '生产生活', formType: '会意',
    description: '表示"仓"的符号，描绘粮仓或储物建筑的形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_028', name: '圈', image: '/dataset/圈/圈_0001_hand.png',
    category: '生产生活', formType: '会意',
    description: '表示"圈"的符号，以环形线条描绘围栏或圈养牲畜的场所。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_029', name: '井', image: '/dataset/井/井_0001_hand.png',
    category: '生产生活', formType: '象形',
    description: '表示"井"的符号，以交叉线条描绘水井的框架结构。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_030', name: '根', image: '/dataset/根/根_0001_hand.png',
    category: '生产生活', formType: '会意',
    description: '表示"根"的符号，描绘植物根部的形态。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },

  // ===== 数字/其他 =====
  {
    id: 'sd_031', name: '一', image: '/dataset/一/一_0001_hand.png',
    category: '其他', formType: '指事',
    description: '数字"一"，以一道横线表示，是最基本的计数符号。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_032', name: '二', image: '/dataset/二/二_0001_hand.png',
    category: '其他', formType: '指事',
    description: '数字"二"，以两道横线表示，原始计数方式的体现。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_033', name: '三', image: '/dataset/三/三_0001_hand.png',
    category: '其他', formType: '指事',
    description: '数字"三"，以三道横线表示，与甲骨文数字体系一脉相承。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_034', name: '七', image: '/dataset/七/七_0001_hand.png',
    category: '其他', formType: '指事',
    description: '数字"七"，以交叉线条表示，原始计数符号。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_035', name: '八', image: '/dataset/八/八_0001_hand.png',
    category: '其他', formType: '指事',
    description: '数字"八"，以两笔相背的线条表示。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_036', name: '十', image: '/dataset/十/十_0001_hand.png',
    category: '其他', formType: '指事',
    description: '数字"十"，以纵横交叉的线条表示，十进制计数的基础。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
  {
    id: 'sd_037', name: '中', image: '/dataset/中/中_0001_hand.png',
    category: '其他', formType: '指事',
    description: '表示"中"的符号，以竖线贯穿方形或圆形表示中心位置。',
    era: '新石器时代中期（约7300年前）', source: '双墩遗址出土陶片',
  },
]

export function filterSymbols(symbols, category, formType) {
  return symbols.filter((s) => {
    const matchCat =
      !category || category === 'all' || s.category === category
    const matchForm =
      !formType || formType === 'all' || s.formType === formType
    return matchCat && matchForm
  })
}

/**
 * Get all original hand-drawn dataset images for a symbol.
 */
export function getDatasetImages(symbol) {
  return datasetFiles[symbol.name] || []
}

/**
 * Get the first dataset image as thumbnail, fallback to symbol.image.
 */
export function getFirstDatasetImage(symbol) {
  const images = datasetFiles[symbol.name]
  return images && images.length > 0 ? images[0] : symbol.image
}
