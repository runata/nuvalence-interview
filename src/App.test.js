import Rectangle from './Rectangle'

describe('intersection tests', () => {
  test('should return proper intersection point for rectangle on top right', () => {
    const rect1 = new Rectangle(0, 0, 2, 2)
    const rect2 = new Rectangle(1, 1, 3, 3)
    expect(rect1.intersect(rect2)).toStrictEqual([{x: 2, y: 1}, {x: 1, y: 2}])
  })

  test('should return proper intersection point for rectangle on bottom left', () => {
    const rect1 = new Rectangle(1, 1, 3, 3)
    const rect2 = new Rectangle(0, 0, 2, 2)
    expect(rect1.intersect(rect2)).toStrictEqual([{x: 2, y: 1}, {x: 1, y: 2}])
  })

  test('should return proper intersection point for rectangle on top left', () => {
    const rect1 = new Rectangle(1, 0, 3, 2)
    const rect2 = new Rectangle(0, 1, 2, 3)
    expect(rect1.intersect(rect2)).toStrictEqual([{x: 1, y: 1}, {x: 2, y: 2}])
  })

  test('should return proper intersection point for rectangle on top', () => {
    const rect1 = new Rectangle(0, 0, 3, 3)
    const rect2 = new Rectangle(1, 1, 2, 4)
    expect(rect1.intersect(rect2)).toStrictEqual([{x: 1, y: 3}, {x: 2, y: 3}])
  })

  test('should return proper intersection point for rectangle on right', () => {
    const rect1 = new Rectangle(0, 0, 3, 3)
    const rect2 = new Rectangle(1, 1, 4, 2)
    expect(rect1.intersect(rect2)).toStrictEqual([{x: 3, y: 1}, {x: 3, y: 2}])
  })

  test('should return proper both intersection points for rectangles positioned crucifix-like', () => {
    const rect1 = new Rectangle(0, 0, 3, 3)
    const rect2 = new Rectangle(1, -1, 2, 4)
    expect(rect1.intersect(rect2)).toStrictEqual([{x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 3}, {x: 1, y: 3}])
  })

  test('should not intersect', () => {
    const rect1 = new Rectangle(0, 0, 3, 3)
    const rect2 = new Rectangle(4, 4, 5, 5)
    expect(rect1.intersect(rect2)).toBeFalsy()
  })
})

describe('containment tests', () => {
  test('should contain', () => {
    const rect1 = new Rectangle(0, 0, 3, 3)
    const rect2 = new Rectangle(1, 1, 2, 2)
    expect(rect1.contains(rect2)).toBeTruthy()
  })

  test('should contain in adjacent case', () => {
    const rect1 = new Rectangle(0, 0, 3, 3)
    const rect2 = new Rectangle(0, 0, 2, 2)
    expect(rect1.contains(rect2)).toBeTruthy()
  })

  test('should not contain', () => {
    const rect1 = new Rectangle(0, 0, 3, 3)
    const rect2 = new Rectangle(1, 1, 4, 4)
    expect(rect1.contains(rect2)).toBeFalsy()
  })
})

describe('adjacement tests', () => {
  test('should be properly adjacent', () => {
    const rect1 = new Rectangle(0, 0, 3, 3)
    const rect2 = new Rectangle(3, 0, 4, 3)
    expect(rect1.adjacent(rect2)).toBe('properly')
  })

  test('should be sub-line adjacent', () => {
    const rect1 = new Rectangle(0, 0, 3, 3)
    const rect2 = new Rectangle(3, 1, 4, 2)
    expect(rect1.adjacent(rect2)).toBe('sub-line')
  })

  test('should be partialy adjacent', () => {
    const rect1 = new Rectangle(0, 0, 3, 3)
    const rect2 = new Rectangle(3, 1, 4, 4)
    expect(rect1.adjacent(rect2)).toBe('partially')
  })
})
