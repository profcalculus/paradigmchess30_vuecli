import { shallowMount } from '@vue/test-utils'
import PGN from '../components/PGN.vue'

const factory = (values = {}, props = {}) => {
    return shallowMount(PGN, {
        data() {
            return {
                ...values
            }
        },
        props: {
            ...props
        }
    })
}

describe('PGN', () => {
    it('Starts off with header', () => {
        const wrapper = factory({}, {
            white: 'White', black: 'Black',
            startFEN: 'rbnnkqbr/pppppppp/8/8/8/8/PPPPPPPP/RBNNKQBR w KQkq - 0 1'
        });
        expect(wrapper.find('["SetUp" "1"]').exists()).toBeTruthy();

    })
});
